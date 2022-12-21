/* global jQuery */
(function bootGridfieldPreview($) {
  const GRIDFIELD_STATE_PREVIEW_NAME = 'Gridfield';

  // eslint-disable-next-line no-shadow
  $.entwine('ss.preview', ($) => {
    /**
     * Literally just hide the special gridfield preview state.
     */
    $(`.cms-preview-states .state-name[data-name="${GRIDFIELD_STATE_PREVIEW_NAME}"]`).entwine({
      onmatch() {
        this.hide();
      },
    });
  });
}(jQuery));
