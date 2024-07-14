import { Button, Input, Upload } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Form = () => {
  const formik = useFormik({
    initialValues: {
      attachments: "",
      subject: "",
      message: "",
    },
    validateOnBlur: true,
    validationSchema: Yup.object({
      attachments: Yup.string().required("Attachments is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters long"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // return form with formik values and validation being invoked on submit only
  return (
    <form style={{ maxWidth: 400 }} onSubmit={formik.handleSubmit}>
      <label htmlFor="attachments">Attachments</label>
      <Upload
        id="attachments"
        value={formik.values.attachments}
        onChange={formik.handleChange}
      >
        <Button>Upload</Button>
      </Upload>
      {formik.touched.attachments && formik.errors.attachments && (
        <div>{formik.errors.attachments}</div>
      )}

      <label htmlFor="subject">Subject</label>
      <Input
        id="subject"
        style={{ marginBottom: 20 }}
        value={formik.values.subject}
        onBlur={formik.handleBlur}
        status={formik.errors.subject ? "error" : "success"}
        onChange={formik.handleChange}
      />
      {formik.touched.subject && formik.errors.subject && (
        <div>{formik.errors.subject}</div>
      )}

      <label htmlFor="message">Message</label>
      <Input.TextArea
        id="message"
        value={formik.values.message}
        onBlur={formik.handleBlur}
        status={formik.errors.message ? "error" : "success"}
        onChange={formik.handleChange}
      />
      {formik.touched.message && formik.errors.message && (
        <div>{formik.errors.message}</div>
      )}

      <button style={{ marginTop: 20 }} type="submit">
        Send
      </button>
    </form>
  );
};
