import React from 'react';

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
