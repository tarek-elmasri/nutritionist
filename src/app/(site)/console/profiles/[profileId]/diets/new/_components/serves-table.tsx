"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCreateDietPlan from "@/hooks/use-create-diet-plan";
import type { FC } from "react";

interface InputCellProps {
  value: number;
  onChange: (value: number) => void;
}
const InputCell: FC<InputCellProps> = ({ value, onChange }) => (
  <TableCell>
    <Input
      maxLength={2}
      className="w-10 text-center"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value) || 0)}
    />
  </TableCell>
);

const ServesTable = () => {
  const {
    servePlanForm,
    serveTypeTotals,
    setServePlanForm,
    categoryTotals,
    profileCalculator,
  } = useCreateDietPlan();

  const totalSaturatedFats =
    categoryTotals.fat - serveTypeTotals.mufa.fat - serveTypeTotals.pufa.fat;

  const maximumSaturatedFats = profileCalculator?.getMaximumSaturatedFat();

  const totalUnsaturatedFats =
    serveTypeTotals.pufa.fat + serveTypeTotals.mufa.fat;

  const maximumUnsaturatedFats =
    profileCalculator?.getMaximumUnsaturatedFat(totalSaturatedFats);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} rowSpan={2}>
            Type
          </TableHead>
          <TableHead>Serves</TableHead>
          <TableHead>CHO</TableHead>
          <TableHead>Protien</TableHead>
          <TableHead>S. Fats</TableHead>
          <TableHead>PUFA</TableHead>
          <TableHead>MUFA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>Starch</TableCell>
          <InputCell
            value={servePlanForm.starch}
            onChange={(starch) => {
              setServePlanForm({ starch });
            }}
          />
          <TableCell>{serveTypeTotals.starch.CHO}</TableCell>
          <TableCell>{serveTypeTotals.starch.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.starch.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Fruits</TableCell>
          <InputCell
            value={servePlanForm.fruit}
            onChange={(fruit) => {
              setServePlanForm({ fruit });
            }}
          />
          <TableCell>{serveTypeTotals.fruit.CHO}</TableCell>
          <TableCell>{serveTypeTotals.fruit.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.fruit.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Vegetables</TableCell>
          <InputCell
            value={servePlanForm.vegetable}
            onChange={(vegetable) => {
              setServePlanForm({ vegetable });
            }}
          />
          <TableCell>{serveTypeTotals.vegetable.CHO}</TableCell>
          <TableCell>{serveTypeTotals.vegetable.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.vegetable.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell rowSpan={4}>Meat</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Low Fat</TableCell>
          <InputCell
            value={servePlanForm.leanMeat}
            onChange={(leanMeat) => {
              setServePlanForm({ leanMeat });
            }}
          />
          <TableCell>{serveTypeTotals.leanMeat.CHO}</TableCell>
          <TableCell>{serveTypeTotals.leanMeat.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.leanMeat.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Medium Fat</TableCell>
          <InputCell
            value={servePlanForm.mediumMeat}
            onChange={(mediumMeat) => {
              setServePlanForm({ mediumMeat });
            }}
          />
          <TableCell>{serveTypeTotals.mediumMeat.CHO}</TableCell>
          <TableCell>{serveTypeTotals.mediumMeat.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.mediumMeat.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>High Fat</TableCell>
          <InputCell
            value={servePlanForm.highMeat}
            onChange={(highMeat) => {
              setServePlanForm({ highMeat });
            }}
          />
          <TableCell>{serveTypeTotals.highMeat.CHO}</TableCell>
          <TableCell>{serveTypeTotals.highMeat.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.highMeat.fat}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell rowSpan={4}>Milk</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Low Fat</TableCell>
          <InputCell
            value={servePlanForm.lowFatMilk}
            onChange={(lowFatMilk) => {
              setServePlanForm({ lowFatMilk });
            }}
          />
          <TableCell>{serveTypeTotals.lowFatMilk.CHO}</TableCell>
          <TableCell>{serveTypeTotals.lowFatMilk.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.lowFatMilk.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Medium Fat</TableCell>
          <InputCell
            value={servePlanForm.mediumFatMilk}
            onChange={(mediumFatMilk) => {
              setServePlanForm({ mediumFatMilk });
            }}
          />
          <TableCell>{serveTypeTotals.mediumFatMilk.CHO}</TableCell>
          <TableCell>{serveTypeTotals.mediumFatMilk.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.mediumFatMilk.fat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>High Fat</TableCell>
          <InputCell
            value={servePlanForm.highFatMilk}
            onChange={(highFatMilk) => {
              setServePlanForm({ highFatMilk });
            }}
          />
          <TableCell>{serveTypeTotals.highFatMilk.CHO}</TableCell>
          <TableCell>{serveTypeTotals.highFatMilk.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.highFatMilk.fat}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}>Legume</TableCell>
          <InputCell
            value={servePlanForm.legume}
            onChange={(legume) => {
              setServePlanForm({ legume });
            }}
          />
          <TableCell>{serveTypeTotals.legume.CHO}</TableCell>
          <TableCell>{serveTypeTotals.legume.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.legume.fat}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}>Add Sugar</TableCell>
          <InputCell
            value={servePlanForm.sugar}
            onChange={(sugar) => {
              setServePlanForm({ sugar });
            }}
          />
          <TableCell>{serveTypeTotals.sugar.CHO}</TableCell>
          <TableCell>{serveTypeTotals.sugar.protien}</TableCell>
          <TableCell colSpan={3}>{serveTypeTotals.sugar.fat}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell rowSpan={3}>Oil</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PUFA</TableCell>
          <InputCell
            value={servePlanForm.pufa}
            onChange={(pufa) => {
              setServePlanForm({ pufa });
            }}
          />
          <TableCell colSpan={3}></TableCell>

          <TableCell>{serveTypeTotals.pufa.fat}</TableCell>
          <TableCell>0</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>MUFA</TableCell>
          <InputCell
            value={servePlanForm.mufa}
            onChange={(mufa) => {
              setServePlanForm({ mufa });
            }}
          />
          <TableCell colSpan={4}>0</TableCell>

          <TableCell>{serveTypeTotals.mufa.fat}</TableCell>
        </TableRow>
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Totals</TableCell>
          <TableCell>
            {categoryTotals.CHO} /{" "}
            <span>{profileCalculator?.getTotalCHO()}</span>
          </TableCell>
          <TableCell>
            {categoryTotals.protien} /{" "}
            <span>{profileCalculator?.getTotalProtein()}</span>
          </TableCell>
          <TableCell>
            {totalSaturatedFats} / <span>{maximumSaturatedFats}</span>
          </TableCell>
          <TableCell colSpan={2}>
            {totalUnsaturatedFats} / <span>{maximumUnsaturatedFats}</span>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ServesTable;
