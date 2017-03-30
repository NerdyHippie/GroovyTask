import { GroovyTaskPage } from './app.po';

describe('ng-cli App', function() {
  let page: GroovyTaskPage;

  beforeEach(() => {
    page = new GroovyTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
