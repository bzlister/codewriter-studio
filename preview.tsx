import {registerRoot} from 'remotion';
import {Codewriter} from './src/codewriter';
import {defaultConfig} from './config';

registerRoot(() => Codewriter({...defaultConfig, contentSource: ''}));
