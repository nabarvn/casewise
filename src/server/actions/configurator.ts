"use server";

import { db } from "@/server/db";

import {
  CaseColor,
  PhoneModel,
  CaseMaterial,
  CaseFinish,
} from "@prisma/client";

export type SaveConfigArgs = {
  configId: string;
  color: CaseColor;
  model: PhoneModel;
  material: CaseMaterial;
  finish: CaseFinish;
};

export async function saveConfig({
  configId,
  color,
  model,
  material,
  finish,
}: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, model, material, finish },
  });
}
