import React from "react";
import Heading from "../heading";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import AdditionalInfoDescriptions from "./additional-info-description";
import AdditionalInfoReviews from "./additional-info-reviews";
import AdditionalInfoQNA from "./additional-info-qna";

export default function AdditionalInfo({ des }: { des: string }) {
  return (
    <div className="p-2 lg:p-0 max-w-5xl m-auto">
      <Heading>Additional Info</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel>Descriptions</FieldLabel>
          <FieldContent>
            <AdditionalInfoDescriptions des={des} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Reviews</FieldLabel>
          <FieldContent>
            <AdditionalInfoReviews />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Q & A</FieldLabel>
          <FieldContent>
            <AdditionalInfoQNA />
          </FieldContent>
        </Field>
      </div>
    </div>
  );
}
