import { generatePseudoRandomId } from '@adam-sv/arc';
import { v4 as uuidv4 } from 'uuid';

export interface ISampleDatum {
  index: number;
  id: string;
  name: string;
  createdAt: Date;
  randomString: string;
  anotherRandomString: string;
}

export const getSampleData = (length: number): ISampleDatum[] => {
  return new Array(length).fill(0).map((zero: number, index: number) => ({
    index,
    id: generatePseudoRandomId(),
    randomString: uuidv4(),
    anotherRandomString: uuidv4(),
    name: `Datum #${index}`,
    createdAt: new Date(new Date().getTime() - index * 1000 * 60),
  }));
};
