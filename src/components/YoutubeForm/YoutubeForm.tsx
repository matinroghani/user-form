import styles from "./YoutubeForm.module.css";
import { useForm, useFieldArray, type FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

interface FormValues {
  username: string;
  email: string;
  channelname: string;
  age: number;
  dob: Date;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: {
    number: string;
  }[];
}

export default function YoutubeForm() {
  const form = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      username: "ALI",
      email: "",
      channelname: "",
      age: 0,
      dob: new Date(),
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: [
        {
          number: "",
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getValues,
    setValue,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    name: "phoneNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    console.log("clicked!");
  };

  const userAge = getValues("age");

  const handleGetValues = () => {
    console.log(`ra: ${userAge}, next year: ${userAge + 1}`);
  };
  const handleSetValues = () => {
    setValue("username", "Matin", {
      shouldTouch: true,
    });
  };

  const onErrorHandler = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className={styles.container}>
      <form
        noValidate
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, onErrorHandler)}
      >
        <h2 className={styles.title}>YouTube Channel Form</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            {...register("username", {
              required: "ist Required!",
            })}
          />
          <p style={{ color: "red" }}>{errors.username?.message}</p>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "invalid Format",
              },
              validate: {
                notAdmin: (field) =>
                  field !== "test@gmail.com" || "anderes Email",
                notBlockList: (field: string) =>
                  !field.endsWith("baddomain.com") || "anderes Email",
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`,
                  );

                  const data = await response.json();

                  console.log(data);

                  return data.length === 0 || "Email already exists";
                },
              },
              required: "Email is Required!",
            })}
            type="email"
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Channel Name</label>
          <input
            className={styles.input}
            {...register("channelname", {
              required: "ist Required!",
            })}
            type="text"
          />
          <p style={{ color: "red" }}>{errors.channelname?.message}</p>
        </div>
        <button className={styles.button} type="submit">
          Create Channel
        </button>
        <button
          className={styles.button}
          onClick={() => {
            reset();
          }}
          type="button"
        >
          RESET
        </button>
        
             <div className={styles.inputGroup}>
              <label className={styles.label}>Age</label>
              <input
                className={styles.input}
                {...register("age", {
                  valueAsNumber: true,
                })}
                type="text"
              />
              <p style={{ color: "red" }}>{errors.channelname?.message}</p>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Date Of Birthday</label>
              <input
                className={styles.input}
                {...register("dob", { valueAsDate: true })}
                type="date"
              />
              <p style={{ color: "red" }}>{errors.channelname?.message}</p>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>twitter</label>
              <input
                className={styles.input}
                {...register("social.twitter")}
                type="text"
              />
              <p style={{ color: "red" }}>{errors.social?.twitter?.message}</p>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>facebook</label>
              <input
                className={styles.input}
                {...register("social.facebook")}
                type="text"
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Phonenumbers List</label>
              <div>
                {fields.map((field, index) => (
                  <div key={field.id} className={styles.inputGroup}>
                    <input
                      className={styles.input}
                      {...register(`phoneNumbers.${index}.number`)}
                      type="text"
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    append({ number: "" });
                  }}
                >
                  +
                </button>
              </div>
            <br />
            <button
          className={styles.button}
          onClick={handleGetValues}
          type="button"
        >
          getValues
            </button>
            <button
          className={styles.button}
          onClick={handleSetValues}
          type="button"
        >
          setValues
            </button>
             </div> 
       
      </form>
      <DevTool control={control} />
    </div>
  );
}
