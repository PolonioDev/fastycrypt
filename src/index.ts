import FastyCryptAsymmetric from './asymmetric';
import FastyCryptSigner from './signer';
import FastyCryptSymmetric from './symmetric';
import * as FastyCryptUtils from './utils';
import * as FastyCryptTypes from './types';

export const box = FastyCryptAsymmetric;
export const secretbox = FastyCryptSymmetric;
export const signer = FastyCryptSigner;
export const utils = FastyCryptUtils;
export const types = FastyCryptTypes;

const FastyCrypt = {
  box,
  secretbox,
  signer,
  utils,
  types
};

export default FastyCrypt;
