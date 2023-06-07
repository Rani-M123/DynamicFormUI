import React, { useRef, useState } from 'react';
import { TextField, PrimaryButton, Stack, IStackTokens } from '@fluentui/react';
import * as yup from 'yup';

interface FormData {
  name: any;
  email: any;
  phone: any;
  file: File | null;
}

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
  file: null,
};

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  file: yup.mixed().required('File is required'),
});

const Form: React.FC = () => {
    const inputRef = useRef(document.createElement("input"))
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormData>(initialFormState);

  const handleChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  const handleReset = () => {
    
    setFormData(initialFormState);
    setFormErrors(initialFormState); 
    inputRef.current.value = ""
    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const handleChange = (field: keyof FormData, value: string | File | null) => {
    //     if (field === 'file') {
    //       setSelectedFile(value as File | null);
    //     } else {
    //       setFormData(prevData => ({
    //         ...prevData,
    //         [field]: value,
    //       }));
    //     }
      
    //     setFormErrors(prevErrors => ({
    //       ...prevErrors,
    //       [field]: '',
    //     }));
    //   };
      
     schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Form is valid, do something with the form data, such as submitting it to an API
        console.log(formData);
        handleReset();
      })
      .catch(errors => {
        // Form is invalid, set the form errors
        const newErrors: FormData = initialFormState;
        errors.inner.forEach((error: { path: string; message: any; }) => {
          newErrors[error.path as keyof FormData] = error.message;
         

        });
        setFormErrors(newErrors);
      });
  };

  const stackTokens: IStackTokens = { childrenGap: 15 };

  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={stackTokens}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e, newValue) => handleChange('name', newValue || '')}
          errorMessage={formErrors.name}
          required
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(e, newValue) => handleChange('email', newValue || '')}
          errorMessage={formErrors.email}
          required
        />
        <TextField
          label="Phone"
          value={formData.phone}
          onChange={(e, newValue) => handleChange('phone', newValue || '')}
          errorMessage={formErrors.phone}
          required
        />
        <input
        ref={inputRef}
          type="file"
          onChange={e => handleChange('file', e.target.files ? e.target.files[0] : null)}
          required

        />
        <Stack horizontal tokens={stackTokens}>
          <PrimaryButton type="submit" text="Submit" />
          <PrimaryButton type="button" text="Reset" onClick={handleReset} />
        </Stack>
      </Stack>
    </form>
  );
};

export default Form;
function setSelectedFile(arg0: File | null) {
    throw new Error('Function not implemented.');
}

