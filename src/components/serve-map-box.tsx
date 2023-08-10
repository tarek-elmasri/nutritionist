"use client";

import { ServePlanForm } from "@/type";
import { FC } from "react";
import Separator from "@/components/ui/separator";

interface ServeMapProps {
  servesCount: ServePlanForm;
  servesTotal: ServePlanForm;
}

const ServeMapBox: FC<ServeMapProps> = ({ servesCount, servesTotal }) => {
  return (
    <div className="sticky top-0 right-0 w-full max-w-[15rem]">
      <div className="p-6 w-full bg-lightgreen/40 rounded-2xl border-2 border-primary space-y-3">
        <h4 className="font-bold text-center">Serve Map</h4>
        <Separator className="py-1" />

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Starch:</p>
          <p className="font-semibold">
            {servesCount.starch}/{servesTotal.starch}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Fruit:</p>
          <p className="font-semibold">
            {servesCount.fruit}/{servesTotal.fruit}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Vegetable:</p>
          <p className="font-semibold">
            {servesCount.vegetable}/{servesTotal.vegetable}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Lean Meet:</p>
          <p className="font-semibold">
            {servesCount.leanMeat}/{servesTotal.leanMeat}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Medium Fat Meat:</p>
          <p className="font-semibold">
            {servesCount.mediumMeat}/{servesTotal.mediumMeat}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>High Fat Meat:</p>
          <p className="font-semibold">
            {servesCount.highMeat}/{servesTotal.highMeat}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Low Fat Milk:</p>
          <p className="font-semibold">
            {servesCount.lowFatMilk}/{servesTotal.lowFatMilk}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Medium Fat Milk:</p>
          <p className="font-semibold">
            {servesCount.mediumFatMilk}/{servesTotal.mediumFatMilk}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>High Fat Milk:</p>
          <p className="font-semibold">
            {servesCount.highFatMilk}/{servesTotal.highFatMilk}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Legume:</p>
          <p className="font-semibold">
            {servesCount.legume}/{servesTotal.legume}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>Sugar:</p>
          <p className="font-semibold">
            {servesCount.sugar}/{servesTotal.sugar}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>PUFA:</p>
          <p className="font-semibold">
            {servesCount.pufa}/{servesTotal.pufa}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-6">
          <p>MUFA:</p>
          <p className="font-semibold">
            {servesCount.mufa}/{servesTotal.mufa}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServeMapBox;
