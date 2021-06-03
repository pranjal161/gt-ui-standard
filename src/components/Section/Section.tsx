import React from 'react';
import image from '_sb_mock_images/Section.png'

export interface SectionProps {

    /**
     * props to define and describe
     */
    prop1?: any
}

/**
 * Display group information
 * Have summary and action
 * Can be expand to see Detail
 * @constructor
 */
const Section: React.FC<SectionProps> = ({}:SectionProps) => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default Section;
