# Silverstripe GridField Preview

A stand-alone `GridField` component that enables previewing records directly from a GridField.

## Install

```sh
composer require guysartorelli/silverstripe-gridfield-preview
```

## CMS User Usage

![example of usage](docs/en/images/preview-example.png)

Click the preview button in the gridfield. This will automatically open the preview panel (in split mode if your screen is wide enough, or in preview mode otherwise) with the preview set to the record you clicked.

![preview button](docs/en/images/preview-button.png)

## Developer Usage

### Directly inn a `ModelAdmin`

The easiest way to use this module is to add `PreviewableModelAdminExtension` as an extension for your `ModelAdmin` subclass. By default this will add a preview button to the gridfield for all tabs that have `CMSPreviewable` models.

```yml
MyApp\Admin\MyModelAdmin:
  extensions:
    - GuySartorelli\GridFieldPreview\PreviewableModelAdminExtension
```

You can also configure this to only add the component for specific model classes:

```yml
MyApp\Admin\MyModelAdmin:
  extensions:
    - GuySartorelli\GridFieldPreview\PreviewableModelAdminExtension
  gridfield_previewable_classes:
    - MyApp\Model\MyPreviewableModel
```

### In literally any other `GridField`

You can add the `GridFieldPreviewButton` `GridField` component to literally _any_ `GridField`, even one that belongs to a `DataObject` which has its own preview!

```php
use GuySartorelli\GridFieldPreview\GridFieldPreviewButton;
use SilverStripe\Forms\GridField\GridField;
use SilverStripe\Forms\GridField\GridFieldConfig_RecordViewer;

//...

    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $fields->addFieldToTab('Root.Main', GridField::create(
            'SomethingPreviewable',
            'Something Previewable',
            MyPreviewableDataObject::get(),
            $config = GridFieldConfig_RecordViewer::create()
        ));

        // Here's the important part - add the GridFieldPreviewButton component!
        $config->addComponent(GridFieldPreviewButton::create());

        return $fields;
    }
```
