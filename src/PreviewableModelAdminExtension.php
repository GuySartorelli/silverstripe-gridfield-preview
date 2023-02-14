<?php

namespace GuySartorelli\GridFieldPreview;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Admin\Navigator\SilverStripeNavigator;
use SilverStripe\Core\Extension;
use SilverStripe\Forms\Form;
use SilverStripe\Forms\GridField\GridFieldConfig;
use SilverStripe\Forms\LiteralField;
use SilverStripe\ORM\CMSPreviewable;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\View\SSViewer;

class PreviewableModelAdminExtension extends Extension
{
    /**
     * A whitelist of classes which should have a preview action added.
     * If this is left empty, it is enabled for all CMSPreviewable classes.
     */
    private static array $gridfield_previewable_classes = [];

    /**
     * Include preview controls for the PdfTemplate GridField.
     */
    public function updateEditForm(Form $form): void
    {
        if ($this->modelClassIsPreviewable()) {
            // Mark as previewable.
            $form->addExtraClass('cms-previewable');
            // Add preview controls.
            $navField = LiteralField::create('SilverStripeNavigator', $this->getDefaultSilverStripeNavigator());
            $navField->setAllowHTML(true);
            $form->Fields()->push($navField);
        }
    }

    /**
     * Allow previewing items directly from the PdfTemplate GridField.
     */
    public function updateGridFieldConfig(GridFieldConfig $config): void
    {
        if ($this->shouldAllowPreview()) {
            $config->addComponent(GridFieldPreviewButton::create());
        }
    }

    /**
     * Check whether previewing is allowed for the current model class.
     */
    private function shouldAllowPreview(): bool
    {
        // Only allow CMSPreviewable models.
        if (!$this->modelClassIsPreviewable()) {
            return false;
        }
        // Respect whitelist.
        $classes = $this->owner->config()->get('gridfield_previewable_classes');
        if (!empty($classes)) {
            return in_array($this->owner->getModelClass(), $classes);
        }
        // If we haven't returned by this point, there is no whitelist so just allow it.
        return true;
    }

    private function modelClassIsPreviewable()
    {
        $ownerModelClass = $this->owner->getModelClass();
        return is_a($ownerModelClass, CMSPreviewable::class, true)
            || $ownerModelClass::has_extension(CMSPreviewable::class);
    }

    /**
     * Gets a SilverStripeNavigator that isn't tied to a specific record.
     */
    private function getDefaultSilverStripeNavigator(): DBHTMLText
    {
        $record = $this->owner->getModelClass()::singleton();
        $navigator = SilverStripeNavigator::create($record);
        $templates = SSViewer::get_templates_by_class($this->owner, '_SilverStripeNavigator', LeftAndMain::class);
        $renderWith = SSViewer::chooseTemplate($templates);
        return $navigator->renderWith($renderWith);
    }
}
