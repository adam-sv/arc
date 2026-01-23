import '@testing-library/jest-dom';
import DOMRectMock from './test-helpers/DOMRectMock';

// The key here is that this is a Mock
// While our DOMRect class doesn't do anything, it... exists, at least
(global as any).DOMRect = DOMRectMock;
