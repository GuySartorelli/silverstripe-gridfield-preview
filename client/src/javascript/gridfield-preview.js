(function bootGridfieldPreview($) {
  // eslint-disable-next-line no-shadow
  $.entwine('ss.preview', ($) => {
    $('.cms-preview').entwine({
      CurrentURL: null,

      /**
       * Override to ensure there is always a valid state available
       * since we're dealing with a whole admin section rather than
       * a specific record.
       *
       * Also forces our preview URL into the state - without this it
       * would try to use the state's preview URL which in this case
       * would be undefined.
       *
       * NOTE: This is unlikely to work as-is in a GridField inside
       * some other CMSPreviewable object's edit form. You'd want to
       * add in a way to get back to the original preview state.
       */
      // eslint-disable-next-line no-underscore-dangle
      _getNavigatorStates() {
        // eslint-disable-next-line no-underscore-dangle
        let states = this._super();
        if (!states.length) {
          states = [{
            name: 'Unversioned',
            url: this.CurrentURL,
            active: true,
          }];
        }
        const preview = this;
        $.map(states, (state) => {
          state.url = preview.getCurrentURL();
          return state;
        });
        return states;
      },

      /**
       * Enable and expand preview panel and preview some URL
       */
      previewSomeURL(url) {
        this.setCurrentURL(url);
        this.setCurrentStateName('Unversioned');
        this.enablePreview();
        // eslint-disable-next-line no-underscore-dangle
        this._loadUrl(url);
        if (!this.is(':visible')) {
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
