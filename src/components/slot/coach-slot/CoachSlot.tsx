'use client'
import { CalendarSlot } from '@/types/Calendar';
import React, { useState } from 'react';
import styles from './CoachSlot.module.css';
import SlotLinkIcon from '../slot-link-icon/SlotLinkIcon';
import SlotStatusIcon from '../slot-status-icon/SlotStatusIcon';
import IconButton from '@/components/buttons/icon-button/IconButton';

export interface CoachSlotPropType {
    slot: CalendarSlot;
}

const CoachSlot: React.FC<CoachSlotPropType> = (props): JSX.Element => {

    const [callComplete, setCallComplete] = useState<boolean>(props.slot.call ? props.slot.call.isCompleted : false);

    const handleDeleteSlot = (): void => {
    }

    const handleCompleteCall = async (): Promise<void> => {
        if(props.slot.call) {
            setCallComplete(true);
        }
    }

    return (
        <>
            <div className={styles.call}>
                {
                    props.slot.call ? (
                        <>
                            <div className={styles.studentName}>
                                <p> {props.slot.call.student.firstName} {props.slot.call.student.lastName}</p>
                            </div>
                            <div>
                                <p> Contact: </p>
                                <div className={styles.contactData}>
                                    <p> {props.slot.call.student.email}</p>
                                    <p> {props.slot.call.student.phoneNumber}</p>
                                </div>
                            </div>
                            { 
                                callComplete &&
                                <div className={styles.reviewData}>
                                    <p> Satisfaction: {props.slot.call.studentSatisfaction ? `${props.slot.call.studentSatisfaction}/5` : 'tbd'} </p>
                                    <p> {props.slot.call.note} </p>
                                </div>
                            }
                        </>
                    ) 
                    : 
                    (
                        <p className={styles.open}> Open slot </p>
                    )
                }
            </div>
            <div className={styles.status}>
                {   
                    props.slot.call  ?
                    (
                        <>
                            <SlotStatusIcon icon='📅'/>
                            {
                                callComplete ? 
                                (
                                    <>
                                        <SlotStatusIcon icon='✅'/>
                                        <SlotLinkIcon url={`/call/${props.slot.call.id}`} icon='✏️'/> 
                                    </>
                                )
                                :
                                (
                                    <IconButton onClick={handleCompleteCall} icon='💾'/> 
                                )
                            }
                        </>
                    )
                    :
                    (
                        <IconButton onClick={handleDeleteSlot} icon='🗑️'/>
                    )
                }
            </div>
        </>
    );
};

export default CoachSlot;