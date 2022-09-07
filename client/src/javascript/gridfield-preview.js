/*
 * NOTE: This is unlikely to work as-is in a GridField inside
 * some other CMSPreviewable object's edit form. You'd want to
 * add in a way to get back to the original preview state.
 *
 * TODO:
 * Add a SilverStripeNagivatorItem subclass instead of hacking
 * our state in.
 * It will need to validate against the _parent_ of the CMSPreviewable
 * which is unlike all the other navigator items, so for now this is
 * easier.
 */
(function bootGridfieldPreview($) {
  const GRIDFIELD_STATE_PREVIEW_NAME = 'gridfield-preview';
  // eslint-disable-next-line no-shadow
  $.entwine('ss.preview', ($) => {
    $('.cms-preview').entwine({
      CurrentURL: null,

      hasGridFieldPreviewButton() {
        return $('button.gridfield-preview-btn').length > 0;
      },

      /**
       * Override to declare our custom state as being allowed.
       */
      getAllowedStates() {
        // eslint-disable-next-line no-underscore-dangle
        const states = this._super();
        if (this.hasGridFieldPreviewButton()) {
          states.push(GRIDFIELD_STATE_PREVIEW_NAME);
        }
        return states;
      },

      /**
       * Override to ensure there is always a valid state available
       * since we're dealing with a whole admin section rather than
       * a specific record.
       *
       * Also forces our preview URL into the state - without this it
       * would try to use the state's preview URL which in this case
       * would be undefined.
       */
      // eslint-disable-next-line no-underscore-dangle
      _getNavigatorStates() {
        // eslint-disable-next-line no-underscore-dangle
        const states = this._super();
        if (this.hasGridFieldPreviewButton()) {
          states.push({
            name: GRIDFIELD_STATE_PREVIEW_NAME,
            url: this.getCurrentURL(),
            active: true,
          });
        }
        return states;
      },

      /**
       * Enable and expand preview panel and preview some URL
       */
      previewSomeURL(url) {
        this.setCurrentURL(url);
        this.setCurrentStateName(GRIDFIELD_STATE_PREVIEW_NAME);
        this.enablePreview();
        // eslint-disable-next-line no-underscore-dangle
        this._loadUrl(url);
        if ($('.preview-mode-selector select').val() === 'content') {
          this.changeMode('split', false);
        }
        if (!this.is(':visible')) {
          this.changeMode('preview', false);
        }
      },

    });

    $('.gridfield-preview-btn').entwine({
      onmatch() {
        // This will fire before the normal entwine onclick handler
        // which means we aren't competing with core gridfield handlers.
        this.on('click', this.handleClick);
      },

      handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        $('.cms-preview').previewSomeURL(this.data('preview-link'));
        return false;
      },
    });
  });
// eslint-disable-next-line no-undef
}(jQuery));
