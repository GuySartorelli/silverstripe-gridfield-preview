<?php

namespace GuySartorelli\GridFieldPreview;

use LogicException;
use SilverStripe\Forms\GridField\AbstractGridFieldComponent;
use SilverStripe\Forms\GridField\GridField_ColumnProvider;
use SilverStripe\ORM\CMSPreviewable;
use SilverStripe\View\ArrayData;
use SilverStripe\View\SSViewer;

/**
 * A button that allows a user to view readonly details of a record. This is
 * disabled by default and intended for use in readonly {@link GridField}
 * instances.
 */
class GridFieldPreviewButton extends AbstractGridFieldComponent implements GridField_ColumnProvider
{
    public function augmentColumns($field, &$columns)
    {
        if (!in_array('Actions', $columns ?? [])) {
            $columns[] = 'Actions';
        }
    }

    public function getColumnsHandled($field)
    {
        return ['Actions'];
    }

    public function getColumnContent($field, $record, $col)
    {
        if (!$record->canView()) {
            return null;
        }
        if (!($record instanceof CMSPreviewable) && !$record->hasExtension(CMSPreviewable::class)) {
            throw new LogicException(__CLASS__ . ' can only be used with CMSPreviewable records.');
        }
        $data = ArrayData::create([
            'PreviewLink' => $record->PreviewLink(),
        ]);
        $template = SSViewer::get_templates_by_class($this, '', __CLASS__);
        return $data->renderWith($template);
    }

    public function getColumnAttributes($field, $record, $col)
    {
        return ['class' => 'action grid-field__col-compact'];
    }

    public function getColumnMetadata($gridField, $col)
    {
        return ['title' => null];
    }
}
