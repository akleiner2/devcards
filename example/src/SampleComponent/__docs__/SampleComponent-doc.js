import React from 'react';
import SampleComponent from '../SampleComponent';
import { card, doc, ns } from 'devcards';

ns('SampleComponent');

card('SampleComponent',
  doc`Lorem ipsum dolor sit amet. Component should be rendered below.`,
  <SampleComponent text={"Hello, world!"} />
);
