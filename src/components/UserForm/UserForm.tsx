import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import type { FormData } from "../../types/types";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserForm() {
  const { control, handleSubmit } = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      country: "Iran",
      gender: "",
      isAgree: false,
      dob: null,
    },
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        background: "#f5f5f5",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 520,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <form
          style={{ display: "grid", gap: 16 }}
          onSubmit={handleSubmit((data) => {
            try {
              console.log(data);
              toast.success("Form submitted successfuly", {
                position: "bottom-right",
                autoClose: 2000,
              });
            } catch {
              toast.error("Something went wron!");
            }
          })}
        >
          {/* TEXT-INPUT */}
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            }}
            render={({ field }) => (
              <TextField {...field} label="full name" variant="outlined" />
            )}
          />

          {/* SELECT INPUT */}
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="country_label">Current Country</InputLabel>
                <Select
                  {...field}
                  labelId="country_label"
                  label="Current Country"
                >
                  <MenuItem value="Iran">Iran</MenuItem>
                  <MenuItem value="Us">United States</MenuItem>
                  <MenuItem value="Deutschland">Deutschland</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          {/* RADIO BUTTON */}
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <FormControl>
                <InputLabel shrink>Gender</InputLabel>
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="female"
                  />
                </RadioGroup>
              </FormControl>
            )}
          />

          {/* DATE PICKER */}
          <Controller
            name="dob"
            control={control}
            rules={{
              required: "Date of birth is required",
            }}
            render={({ field }) => (
              <DatePicker
                label="Date of Birthday"
                value={field.value}
                onChange={(value) => field.onChange(value)}
                format="YYYY/MM/DD"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "outlined",
                  },
                }}
              />
            )}
          />

          {/* CHECKBOX */}
          <Controller
            name="isAgree"
            control={control}
            rules={{
              validate: (value) =>
                value === true || "You must accept the terms",
            }}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Accepted the Terms and Conditions"
              />
            )}
          />

          {/* SUBMIT BUTTON */}
          <Button variant="outlined" type="submit">
            send Form
          </Button>
        </form>
      </Card>
    </div>
  );
}
