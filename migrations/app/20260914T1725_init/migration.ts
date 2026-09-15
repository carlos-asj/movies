#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3f7ca026c91caf3247e4bf13c12568d05d9b32cb1a249c1f7725165f37d46323/contract';
import endContract from '../../snapshots/3f7ca026c91caf3247e4bf13c12568d05d9b32cb1a249c1f7725165f37d46323/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
