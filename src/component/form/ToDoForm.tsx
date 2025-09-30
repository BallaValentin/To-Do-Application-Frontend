import { Box, Button, FormControl, FormHelperText, Grid2, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToDo } from '../../interface/ToDo';

interface FormError {
  title: string;
  description: string;
  dueDate: string;
  levelOfImportance: string;
}

interface ToDoFormProps {
  initialValues?: ToDo;
  isPending: boolean;
  onSubmit: (formData: ToDo) => void;
}

function ToDoForm(toDoForm: ToDoFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ToDo>({
    title: toDoForm.initialValues?.title || '',
    description: toDoForm.initialValues?.description || '',
    dueDate: new Date(),
    levelOfImportance: toDoForm.initialValues?.levelOfImportance || 0,
  });

  const [error, setError] = useState<FormError | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid: boolean = true;

    const newErrors: FormError = {
      title: '',
      description: '',
      dueDate: '',
      levelOfImportance: '',
    };

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = t('todoFormTitleErr');
      isValid = false;
    }

    if (!formData.description || formData.description.trim() === '') {
      newErrors.description = t('todoFormDescErr');
      isValid = false;
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 't(todoFormDateErr)';
      isValid = false;
    }

    if (!Number.isInteger(Number(formData.levelOfImportance)) || formData.levelOfImportance <= 0) {
      newErrors.levelOfImportance = t('todoFormPriorityErr');
      isValid = false;
    }

    if (!isValid) {
      setError(newErrors);
    } else {
      setError(null);
      toDoForm.onSubmit(formData);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t('todoFormMainTitle')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          <FormControl fullWidth error={Boolean(error?.title)}>
            <TextField
              name="title"
              label={t('todoFormTitle')}
              value={formData?.title}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
            />
            {error?.title && <FormHelperText>{error?.title}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(error?.description)}>
            <TextField
              name="description"
              label={t('todoFormDesc')}
              value={formData?.description}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
            />
            {error?.description && <FormHelperText>{error?.description}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(error?.dueDate)}>
            <TextField
              name="dueDate"
              label={t('todoFormDate')}
              type="date"
              value={formData?.dueDate}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
            />
            {error?.dueDate && <FormHelperText>{error?.dueDate}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth error={Boolean(error?.levelOfImportance)}>
            <TextField
              name="levelOfImportance"
              label={t('todoFormPriority')}
              type="number"
              value={formData?.levelOfImportance}
              onChange={handleChange}
              required
              variant="outlined"
              fullWidth
            />
            {error?.levelOfImportance && <FormHelperText>{error?.levelOfImportance}</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained" color="primary" disabled={toDoForm.isPending} fullWidth>
            {toDoForm.isPending ? t('todoFormPendingSubmitBtn') : t('todoFormSubmitBtn')}
          </Button>
        </Grid2>
      </form>
    </Box>
  );
}

export default ToDoForm;
