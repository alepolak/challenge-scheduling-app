'use client';
import React, { useState } from 'react';
import styles from './CallEdititionForm.module.css';
import { Call } from '@/types/Call';
import { cancel, saveCall } from './actions';
import TextButton from '@/components/buttons/text-button/TextButton';

export interface CallEditionFormPropType {
    call: Call;
}

const CallEditionForm: React.FC<CallEditionFormPropType> = (props): JSX.Element => {
    const [callCompleted, setCallCompleted] = useState(props.call.isCompleted ?? false);
    const [satisfaction, setSatisfaction] = useState(props.call.studentSatisfaction ?? 3);
    const [notes, setNotes] = useState(props.call.note ?? "");

    const submit = async () => {
        if(props.call){
            await saveCall(props.call.id, callCompleted, satisfaction, notes);
        }
    }

    return (
        <div className={styles.formComponent}>
            {
                props.call &&
                <>
                    <div className={styles.studentName}>
                        <h2> {props.call.student.firstName} {props.call.student.lastName}</h2>
                    </div>
                    <div>
                        <p>Contact:</p>
                        <div className={styles.contactData}>
                            <p>{props.call.student.email}</p>
                            <p>{props.call.student.phoneNumber}</p>
                        </div>
                    </div>
                    <form className={styles.form}>
                        <div className={styles.inputs}>
                            <div className={styles.topInput}>
                                <div className={styles.inputContainer}>
                                    <label htmlFor='callCompleted'>Is call over:</label>
                                    <input
                                        id="callCompleted"
                                        name="callCompleted"
                                        type='checkbox'
                                        checked={callCompleted}
                                        onChange={() => setCallCompleted(!callCompleted)}
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <div>
                                        <label htmlFor='satisfaction'>Satisfaction:</label>
                                        <p className={styles.sliderValue}>{satisfaction}/5</p>
                                    </div>
                                    <div className={styles.sliderContainer}>
                                        <input
                                            id="satisfaction"
                                            name="satisfaction"
                                            type='range'
                                            min={1}
                                            max={5}
                                            value={satisfaction}
                                            onChange={(e) => setSatisfaction(Number(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.noteInputContainer}>
                                <label htmlFor='notes'>Notes:</label>
                                <textarea
                                    className={styles.noteInput}
                                    id="notes"
                                    name="notes"
                                    placeholder='Student notes'
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <TextButton formAction={cancel} text="Cancel"/>
                            <TextButton formAction={submit} disabled={props.call === null} kind="primary" text="Save"/>
                        </div>
                    </form>
                </>
            }
        </div>
    );
};

export default CallEditionForm;
