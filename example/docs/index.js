import React from 'react';

// Import devcards here
import '../src/SampleComponent/__docs__/SampleComponent-doc';

import { ns, card, doc, run } from 'devcards';

ns('index')

card('index',
  doc`
  ## Hello, world! ##
  Lorem ipsum dolor sit amet.`,
  <div />,
  {},
  {heading: false});

run();
