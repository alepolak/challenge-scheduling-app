'use client'
import { CalendarSlot } from '@/types/Calendar';
import React from 'react';
import styles from './StudentSlot.module.css';
import { User } from '@/types/Users';
import SlotStatusIcon from '../slot-status-icon/SlotStatusIcon';
import IconButton from '@/components/buttons/icon-button/IconButton';

export interface StudentSlotPropType {
    slot: CalendarSlot;
    student: User;
}

const StudentSlot: React.FC<StudentSlotPropType> = (props): JSX.Element => {
   
    const handleCreateCall = async () => {
        
    }

    return (
        <>
            <div className={styles.call}>
                {
                    props.slot.call ? (
                        <>
                            <div className={styles.coachData}>
                                <p className={styles.coachName}> {props.slot.coach.firstName} {props.slot.coach.lastName} </p>
                                <p> {props.slot.coach.email}</p>
                                <p> {props.slot.coach.phoneNumber}</p>
                            </div>
                        </>
                    ) 
                    : 
                    (
                        <div className={styles.open}>
                            <p> Open slot with </p>
                            <p className={styles.coachName}> {props.slot.coach.firstName} {props.slot.coach.lastName} </p>
                        </div>
                    )
                }
            </div>
            <div className={styles.status}>
            {   
                props.slot.call ?
                (
                    props.slot.call.isCompleted ? 
                    (
                        <SlotStatusIcon icon='✅'/>
                    )
                    :
                    (
                        <SlotStatusIcon icon='📅'/>
                    )

                )
                :
                (
                    <IconButton onClick={handleCreateCall} icon='➕'/>
                )
                
            }
            </div>
        </>
    );
};

export default StudentSlot;