/* global jQuery */
(function bootGridfieldPreview($) {
  const GRIDFIELD_STATE_PREVIEW_NAME = 'Gridfield';
  const GRIDFIELD_STATE_SELECTOR = `.cms-preview-states .state-name[data-name="${GRIDFIELD_STATE_PREVIEW_NAME}"]`;

  // eslint-disable-next-line no-shadow
  $.entwine('ss.preview', ($) => {
    $('.cms-preview').entwine({
      /**
       * Add a helper to allow us to get the gridfield state button.
       * Adding here instead of gridfield-preview.js so we don't have
       * to define that long selector twice.
       */
      getGridfieldStateButton() {
        return $(GRIDFIELD_STATE_SELECTOR);
      },
    });

    /**
     * Literally just hide the special gridfield preview state.
     */
    $(GRIDFIELD_STATE_SELECTOR).entwine({
      onmatch() {
        this.hide();
      },
    });
  });
}(jQuery));
