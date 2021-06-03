import Quote from './Quote';
import React from 'react';
import withActivity from 'hocs/withActivity';

const TrainingPranjal = () => {
    const url = 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYScs';
    const QuoteViewActivity: any = withActivity(Quote, url)
    
    return (<>{QuoteViewActivity}</>)
}

export default TrainingPranjal;