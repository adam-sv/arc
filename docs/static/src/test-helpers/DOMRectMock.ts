class DOMRectMock {
  constructor(
    public x?: number,
    public y?: number,
    public width?: number,
    public height?: number
  ) {}

  fromRect(other?: DOMRectInit): DOMRect {
    throw new Error('DOMRect mock was used in a non-mocking fashion...');
  }

  toJSON() {
    return '';
  }
}

export default DOMRectMock;
