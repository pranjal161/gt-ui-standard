export const response = {
    '_links': {
        'self': {
            'name': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021',
            'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
            'title': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021'
        }
    },
    'quote:contract_start_date': '2021-06-03',
    'quote:start_date': '2021-06-03',
    'quote:status': 'draft',
    '_options': {
        'links': [
            {
                'schema': {
                    'influencers': [
                        'quote:contract_start_date',
                        'quote:description'
                    ],
                    'properties': {
                        'quote:description': {
                            'type': 'string',
                            'maxLength': 20
                        },
                        'quote:contract_start_date': {
                            'format': 'date',
                            'type': 'string'
                        },
                        'quote:status':{'oneOf':[{'description':'language:en-GB','title':'Not saved','enum':['draft']},
                            {'description':'language:en-GB','title':'Saved','enum':['in_force']},
                            {'description':'language:en-GB','title':'Transferred','enum':['transferred']}],'type':'string'},
                    }
                },
                'method': 'PATCH',
                'rel': 'update',
                'mediaType': 'application/json',
                'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
                'title': 'Update a Quote'
            }
        ],
        'properties': {
            'required': ['quote:product_id','quote:distributor_id','quote:status','quote:contract_start_date'],
            'quote:contract_start_date': {
                'format': 'date',
                'type': 'string'
            },
            'quote:description': {
                'type': 'string',
                'maxLength': 20
            },
            'quote:start_date': {
                'format': 'date',
                'type': 'string'
            },
            'quote:status':{'oneOf':[{'description':'language:en-GB','title':'Not saved','enum':['draft']},
                {'description':'language:en-GB','title':'Saved','enum':['in_force']},
                {'description':'language:en-GB','title':'Transferred','enum':['transferred']}],'type':'string'},
        },
        'quote:description': null
    }
}

export const disableResponse = {
    '_links': {
        'self': {
            'name': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021',
            'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
            'title': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021'
        }
    },
    'quote:contract_start_date': '2021-06-03',
    '_options': {
        'links': [
            {
                'schema': {
                    'influencers': [
                        'quote:contract_start_date',
                        'quote:description'
                    ],
                    'properties': {
                        'quote:contract_start_date': {
                            'format': 'date',
                            'type': 'string'
                        }
                    }
                },
                'method': 'PATCH',
                'rel': 'update',
                'mediaType': 'application/json',
                'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
                'title': 'Update a Quote'
            }
        ],
        'title': 'Quote resource interactions',
        'properties': {
            'quote:contract_start_date': {
                'format': 'date',
                'type': 'string'
            },
            'quote:description': {
                'type': 'string',
                'maxLength': 20
            }
        },
        'required': [
            'quote:contract_start_date'
        ]
    },
    'quote:description': null
}

export const prefilled = {
    '_links': {
        'self': {
            'name': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021',
            'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
            'title': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021'
        }
    },
    'quote:contract_start_date': '2021-06-03',
    '_options': {
        'links': [
            {
                'schema': {
                    'influencers': [
                        'quote:contract_start_date',
                        'quote:description'
                    ],
                    'properties': {
                        'quote:description': {
                            'type': 'string',
                            'maxLength': 250
                        },
                        'quote:contract_start_date': {
                            'format': 'date',
                            'type': 'string'
                        }
                    }
                },
                'method': 'PATCH',
                'rel': 'update',
                'mediaType': 'application/json',
                'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
                'title': 'Update a Quote'
            }
        ],
        'title': 'Quote resource interactions',
        'properties': {
            'quote:contract_start_date': {
                'format': 'date',
                'type': 'string'
            },
            'quote:description': {
                'type': 'string',
                'maxLength': 250
            }
        },
        'required': [
            'quote:contract_start_date'
        ]
    },
    'quote:description': 'This is prefilled textarea'
}

export const errorResponse = {
    '_links': {
        'self': {
            'name': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021',
            'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
            'title': 'Quote QT000007752 - Mister Mryn2 HAUSER - OIUI UIUI - STHRT6776 - 03/06/2021'
        }
    },
    'quote:contract_start_date': '2021-06-03',
    '_options': {
        'links': [
            {
                'schema': {
                    'influencers': [
                        'quote:contract_start_date',
                        'quote:description'
                    ],
                    'properties': {
                        'quote:description': {
                            'type': 'string',
                            'maxLength': 20
                        },
                        'quote:contract_start_date': {
                            'format': 'date',
                            'type': 'string'
                        }
                    }
                },
                'method': 'PATCH',
                'rel': 'update',
                'mediaType': 'application/json',
                'href': 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYTsc',
                'title': 'Update a Quote'
            }
        ],
        'title': 'Quote resource interactions',
        'properties': {
            'quote:contract_start_date': {
                'format': 'date',
                'type': 'string'
            },
            'quote:description': {
                'type': 'string',
                'maxLength': 20
            }
        },
        'required': [
            'quote:contract_start_date'
        ]
    },
    'quote:description': 'This is Prefilled Value with limit exceeding MAXLENTGH. Check error by giving it a Blur or Change event.'
}