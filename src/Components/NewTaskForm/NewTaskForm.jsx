import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import postTask, { deleteTasks } from '../../redux/asyncActions/tasks';
import styles from './NewTaskForm.module.scss';
import FormError from '../FormError/FormError';


function NewTaskForm() {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  
  const clearAllTasks = () => {
    dispatch(deleteTasks());
  }
  
  const onSubmit = (data) => {
    dispatch(postTask({time: data.time, message: data.event, date: new Date().toLocaleDateString()}));
    
  }
  
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <input className={styles.time} placeholder='time' type='time' {...register('time', {required: 'Time is required'})} />
      <input className={styles.text} {...register('event', {required: 'Message is required', minLength: {
        value: 5,
        message: 'Minimum 10 characters',
      }, maxLength: {
        value: 100,
        message: 'Мaximum 100 characters',
      }})} placeholder='Enter a new event' />
      {errors?.time && <FormError error={errors.time.message} />}
      {errors?.event && <FormError error={errors.event.message} />}
      <div>
        <button type='submit'>ADD</button>
        <button type='button' onClick={clearAllTasks}>CLEAR ALL</button>
      </div>
    </form>
  )
}

export default NewTaskForm;
