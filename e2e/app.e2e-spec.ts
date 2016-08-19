import { Oauth2frontPage } from './app.po';

describe('oauth2front App', function() {
  let page: Oauth2frontPage;

  beforeEach(() => {
    page = new Oauth2frontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
