import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import postTaskThunk, { deleteTasksThunk } from '../../redux/asyncActions/tasks';
import FormError from '../FormError/FormError';
import styles from './NewTaskForm.module.scss';

function NewTaskForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  const clearAllTasks = () => {
    dispatch(deleteTasksThunk());
  };

  const onSubmit = (data) => {
    dispatch(
      postTaskThunk({
        time: data.time,
        message: data.event,
        date: new Date().toLocaleDateString(),
      }),
    );
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input
        className={styles.time}
        type="text"
        placeholder="--:--"
        {...register('time', {
          required: 'Time is required',
          minLength: {
            value: 5,
            message: 'Minimum 5 characters',
          },
          maxLength: {
            value: 5,
            message: 'Мaximum 5 characters',
          },
          pattern: {
            value: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/,
            message: 'Incorrect format',
          },
        })}
      />
      <input
        className={styles.text}
        {...register('event', {
          required: 'Message is required',
          minLength: {
            value: 5,
            message: 'Minimum 10 characters',
          },
          maxLength: {
            value: 100,
            message: 'Мaximum 100 characters',
          },
        })}
        placeholder="Enter a new event"
      />
      {errors?.time && <FormError error={errors.time.message} />}
      {errors?.event && <FormError error={errors.event.message} />}
      <div>
        <button type="submit">ADD</button>
        <button type="button" onClick={clearAllTasks}>
          CLEAR ALL
        </button>
      </div>
    </form>
  );
}

export default NewTaskForm;
