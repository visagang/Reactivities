import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity, ActivityFormValues } from '../../../app/models/activity';



export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const history = useHistory();
    const { loadingInitial, createActivity, updateActivity, loadActivity, loading } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is requried'),
        description: Yup.string().required('Description is requried'),
        category: Yup.string().required(),
        city: Yup.string().required(),
        date: Yup.string().required('Date is required'),
        venue: Yup.string().required(),
    })


    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity]);

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value});
    // }


    function handleFormSubmit(activity: ActivityFormValues) {
        if(!activity.id ) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }

    }

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..." />
    }
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema} enableReinitialize
            initialValues={activity} onSubmit={values => handleFormSubmit(values)}>
                {({ values:activity, handleSubmit, isValid,isSubmitting,dirty,handleChange }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title'/>   
                        <MyTextArea rows={3} name='description' placeholder='Description'/>   
                        <MySelectInput name='category' placeholder='Category' options={categoryOptions}/>
                        <MyDateInput 
                        placeholderText='Date'
                        name='date'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput name='city' placeholder='City'/>   
                        <MyTextInput name='venue' placeholder='Venue'/>    
                        <Button disabled={isSubmitting || !dirty || !isValid} floated='right' loading={isSubmitting} positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}

            </Formik>
        </Segment>
    )
})