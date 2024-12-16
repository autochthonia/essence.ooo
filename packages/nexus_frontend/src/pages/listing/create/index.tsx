import React, { FunctionComponent, Fragment } from "react";
import toNumber from "lodash/toNumber";
import { Formik, Form } from "formik";
import useAuthContext from "../../../services/auth";
import LoginOrganism from "../../../organisms/login";
import Field from "../../../molecules/Field";
import SelectField from "../../../molecules/Field/Select";
import createListing from "./createListing";
import Cookies from "js-cookie";

const CreateListingPage: FunctionComponent = () => {
  const { user } = useAuthContext();

  return (
    <div
      style={{
        maxWidth: "100%",
        width: 600,
        height: "100%",
        background: "#fbfaf499",
        padding: 6,
        boxSizing: "border-box",
        margin: "0 auto",
        borderLeft: "2px solid #fbfaf4",
        borderRight: "2px solid #fbfaf4",
      }}
    >
      <LoginOrganism />

      <h2>Create New Listing</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          splat: "Solars",
          edition: "Third",
          medium: "Online Voice",
          schedule: "",
          players: 5,
          owner_id: toNumber(user?.id),
        }}
        onSubmit={async (variables, formik) => {
          try {
            const { errors } = await createListing({
              discordToken: Cookies.getJSON("discord_token"),
              listing: variables,
            });
            if (!errors) {
              formik.resetForm();
              alert("Your game will be posted shortly");
            }
          } catch (ex) {
            console.error(ex);
          }
        }}
      >
        {({ isValid, isSubmitting }) => (
          <Fragment>
            {/* {error && <span>{error.message}</span>} */}
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <fieldset
                disabled={
                  !user
                  // || loading
                }
              >
                <Field name="title" label="Game Name" maxLength={256} />
                <Field
                  name="description"
                  label="Description"
                  fieldType="textarea"
                  maxLength={2048}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <SelectField
                    name="splat"
                    label="Splat"
                    options={[
                      "Solars",
                      "Dragon-Blooded",
                      "Lunars",
                      "Other",
                    ].map((v) => ({ label: v, value: v }))}
                  />
                  <SelectField
                    name="edition"
                    label="Edition"
                    options={["Third", "Essence", "First", "Second"].map(
                      (v) => ({
                        label: v,
                        value: v,
                      })
                    )}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <SelectField
                    name="medium"
                    label="Medium"
                    options={["Online Voice", "Online Text", "In Person"].map(
                      (v) => ({
                        label: v,
                        value: v,
                      })
                    )}
                  />

                  <Field
                    name="players"
                    label="Players"
                    fieldType="number"
                    flexDirection="row"
                    placeholder="0"
                    max="100"
                  />
                </div>
                <Field name="schedule" label="Schedule" maxLength={1024} />

                <button type="submit" disabled={!isValid || isSubmitting}>
                  Create Listing
                </button>
              </fieldset>
            </Form>
          </Fragment>
        )}
      </Formik>
      {/* {(getListingsData?.listings?.length ?? 0) > 0 && (
        <Fragment>
          <h2>Your Listings</h2>
          <ul>
            {getListingsData?.listings!.map(l => (
              <li key={l?.id}>{l?.title}</li>
            ))}
          </ul>
        </Fragment>
      )} */}
    </div>
  );
};

export default CreateListingPage;
