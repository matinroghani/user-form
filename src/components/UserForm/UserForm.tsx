import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { userFormSchema } from "../../validations/userFormSchema";
import type { UserFormDate } from "../../validations/userFormSchema";

export default function UserForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormDate>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      country: "",
      gender: "",
      dob: dayjs(),  
      isAgree: false,
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
      <Card sx={{ width: "100%", maxWidth: 520, p: 4, borderRadius: 3 }}>
        <form
          style={{ display: "grid", gap: 16 }}
          onSubmit={handleSubmit((data) => {
            console.log(data);
            toast.success("Form submitted successfully");
          })}
        >
          {/* NAME */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* COUNTRY */}
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.country}>
                <InputLabel>Country</InputLabel>
                <Select {...field} label="Country">
                  <MenuItem value="Iran">Iran</MenuItem>
                  <MenuItem value="US">United States</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                </Select>
                <FormHelperText>{errors.country?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* GENDER */}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.gender}>
                <RadioGroup {...field}>
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
                <FormHelperText>{errors.gender?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* DOB */}
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Date of birth"
                value={field.value}
                onChange={(val) => field.onChange(val)}
                format="YYYY/MM/DD"
                slotProps={{
                  textField: {
                    error: !!errors.dob,
                    helperText: errors.dob?.message,
                  },
                }}
              />
            )}
          />

          {/* TERMS */}
          <Controller
            name="isAgree"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.isAgree}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="I accept terms"
                />
                <FormHelperText>{errors.isAgree?.message}</FormHelperText>
              </FormControl>
            )}
          />

          {/* SUBMIT */}
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}