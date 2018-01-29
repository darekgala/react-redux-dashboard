import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import {} from 'jest';



describe('After Jest setup', () => {
  it('Assertion should pass', () => {
    expect(1).toEqual(1);
  })
});

  /*
  // Render a checkbox with label in the document
  const checkbox = TestUtils.renderIntoDocument(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />
  );

  const checkboxNode = ReactDOM.findDOMNode(checkbox);

  // Verify that it's Off by default
  expect(checkboxNode.textContent).toEqual('Off');

  // Simulate a click and verify that it is now On
  TestUtils.Simulate.change(
    TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
  );
  expect(checkboxNode.textContent).toEqual('On');
  */
