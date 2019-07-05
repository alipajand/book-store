// Import Vue and the component being tested
import AppComponent from '../../src/App';

// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('AppComponent', () => {
  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof AppComponent.created).toBe('function');
  });
});
