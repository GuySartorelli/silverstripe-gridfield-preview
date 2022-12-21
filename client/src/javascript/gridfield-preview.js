/* global jQuery */
(function bootGridfieldPreview($) {
  const GRIDFIELD_STATE_PREVIEW_NAME = 'Gridfield';
  const CMS_PREVIEW_SELECTOR = '.cms-preview';

  // eslint-disable-next-line no-shadow
  $.entwine('ss.preview', ($) => {
    /**
     * Add in methods and functionality to handle our custom gridfield preview state
     */
    $(CMS_PREVIEW_SELECTOR).entwine({
      CurrentURL: null,

      /**
       * Add the custom gridfield state to the list of allowed states
       */
      allowGridfieldState() {
        const allowedStates = this.getAllowedStates();
        if (!allowedStates.includes(GRIDFIELD_STATE_PREVIEW_NAME)) {
          allowedStates.push(GRIDFIELD_STATE_PREVIEW_NAME);
          this.setAllowedStates(allowedStates);
        }
      },

      /**
       * Enable and expand preview panel and preview some URL
       */
      previewFromGridfield(url) {
        // Set our state's URL
        const state = $(`.cms-preview-states .state-name[data-name="${GRIDFIELD_STATE_PREVIEW_NAME}"]`);
        state.attr('href', url);

        // Enable preview and set our custom state
        this.enablePreview();
        this.changeState(GRIDFIELD_STATE_PREVIEW_NAME, false);

        // Ensure preview panel is open
        if ($('.preview-mode-selector select').val() === 'content') {
          this.changeMode('split', false);
        }
        if (!this.is(':visible')) {
          this.changeMode('preview', false);
        }
      },

      /**
       * Override changeState method to show/hide our custom gridfield preview state button
       */
      changeState: function(stateName, ...args) {
        if (stateName === GRIDFIELD_STATE_PREVIEW_NAME) {
          this.getGridfieldStateButton().show();
        } else {
          this.getGridfieldStateButton().hide();
        }
        this._super(stateName, ...args);
      },
    });

    /**
     * Click handler for the gridfield preview button
     */
    $('.grid-field .gridfield-preview-btn').entwine({
        onmatch() {
        // Make sure the custom state is allowed.
        $(CMS_PREVIEW_SELECTOR).allowGridfieldState();
        // This will fire before the normal entwine onclick handler
        // which means we aren't competing with core gridfield handlers.
        this.on('click', this.handleClick);
      },

      handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        $(CMS_PREVIEW_SELECTOR).previewFromGridfield(this.data('preview-link'));
        return false;
      },
    });
  });
}(jQuery));
