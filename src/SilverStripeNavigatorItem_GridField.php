<?php

namespace GuySartorelli\GridFieldPreview;

use SilverStripe\Admin\LeftAndMain;
use SilverStripe\Admin\Navigator\SilverStripeNavigatorItem;
use SilverStripe\Control\Controller;

class SilverStripeNavigatorItem_Gridfield extends SilverStripeNavigatorItem
{
    public function getHTML()
    {
        // This is only used in the SilverStripeNavigator on the front-end
        // which we don't want this to display on anyway.
        return '';
    }

    public function getLink()
    {
        return $this->getRecord()->PreviewLink() ?? '';
    }

    public function getTitle()
    {
        return  _t(self::class . '.GRIDFIELD_PREVIEW', 'Gridfield preview');
    }

    /**
     * Can always be used in the CMS, but never on the front-end.
     */
    public function canView($member = null)
    {
        return Controller::curr() instanceof LeftAndMain;
    }

    /**
     * This item is never active initially - it has to be explicitly activated via javascript.
     */
    public function isActive()
    {
        return false;
    }
}
