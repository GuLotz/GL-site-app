import { GLSiteAppPage } from './app.po';

describe('gl-site-app App', () => {
  let page: GLSiteAppPage;

  beforeEach(() => {
    page = new GLSiteAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
