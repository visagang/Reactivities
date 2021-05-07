import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

export default function ActivityDetail() 
{
    const  {activityStore} = useStore();
    const {selectedActivity: activity, openForm, cancelSelectedActivity} = activityStore;

    if(!activity) return <LoadingComponent />;

    return (
        <Card fluid> 
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
                <span className='date'>{activity.date}</span>
            </Card.Meta>
            <Card.Description>
                {activity.description}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group width = '2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button basic color='grey' onClick={cancelSelectedActivity} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}