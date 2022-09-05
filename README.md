# Stripecon Lightning Talk 2022: CMS Preview - beyond the documentation

## Done

- Basic examples from documentation
  - In a ModelAdmin
  - On a page
  - Model as a Page
- Example that can be previewed from a modeladmin OR on a page

## TODO

- set up previewable PDF templates
  - set up advanced preview options
    - set an ID for the `DataObject` which is being used to substitute variables
    - select which out of several items on a page will be previewed?
  - have a list of clients with some pdfs that were already sent to them
    - when viewing the client edit form maybe have the pdfs in the preview panel (collapsed by default with no preview, but click on some button and js fires to open the panel showing the pdfs)
- see if you can preview `SiteConfig`
  - if so, see if there's some useful thing you can do here
- see if you can have a preview panel in ModelAdmin at the gridfield level
  - if so, see if there's some useful thing you can do here
- see if you can preview members or other things in the `SecurityAdmin`
  - if so, wee if there's some useful thing you can do here
  - check out the member profiles module and see if that has some tie-in opportunity here
- ??

## Stretch goals

- Add lots of nice documentation in the code (phpdocs mostly) to help people navigate the examples
- Make the demonstrations look nice (theming)
- have some miniature set of slides (or even just an opening presentation page) inside the app
  - Who I am
  - Demo time
  - ??
- set up fixtures so others can easily spin up the demonstrations if they want
