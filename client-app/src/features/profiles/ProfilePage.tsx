import { observer } from 'mobx-react-lite';
import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';


export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { profileStore } = useStore();
    const { loadProfile, loadingProfile, profile, setActiveTab } = profileStore;

    useEffect(() => {
        loadProfile(username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, username])

    if (loadingProfile) return <LoadingComponent content="Loading Profile..." />
    return (
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                    <Fragment>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </Fragment>
                }
            </Grid.Column>
        </Grid>
    );
})