import React from 'react';

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

let cardURL = "http://localhost:3000/cards/{0}";

function saveCard(saveCardURL, obj, currentUserId) {
    return fetch(saveCardURL,
        {
            method: 'POST',
            headers: { 'currentId': currentUserId },
            body: JSON.stringify(obj),
        }).then((response) => {
            if (response.status !== 200) {
                throw "unexpected error";
            }
        });
}

export function saveCtmCard(obj, currentUserId) {
    let saveCtmCardURL = "http://localhost:3000/users/" + currentUserId + "/custom";
    return saveCard(saveCtmCardURL, obj, currentUserId);
};

export function updateCard(id, obj, currentUserId) {
    return fetch(cardURL.format(id),
        {
            method: 'PUT',
            headers: { 'currentId': currentUserId },
            body: JSON.stringify(obj)
        }).then((response) => {
            if (response.status !== 200) {
                throw "unexpected error";
            }
        });
};

export class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { side0: "", side1: "" },
            title: "Add New",
            isHidden: this.props.hidden,
        }

        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedId) {
            if (nextProps.selectedId != this.props.selectedId || nextProps.hidden != this.props.hidden) {
                this.getCardById(nextProps.selectedId, nextProps.currentUserId)
                    .then((data) => {
                        if (!data["ownership"]) {
                            this.props.onAccessDenied();
                        } else {
                            this.setState({
                                data: data,
                                title: "Edit",
                                isHidden: nextProps.hidden
                            })
                        }
                    }).catch((e) => {
                        console.log(e);
                        throw e;
                    });
            }
        } else {
            this.setState({
                isHidden: nextProps.hidden,
            })
        }
    }

    getCardById(id, currentUserId) {
        return fetch(cardURL.format(id),
            {
                method: 'GET',
                headers: { 'currentId': currentUserId },
            }).then((response) => {
                return response.json();
            });
    }

    componentWillMount() {
        if (this.props.selectedId) {
            this.getCardById(this.props.selectedId, this.props.currentUserId)
                .then((data) => {
                    if (!data["ownership"]) {
                        this.setState({
                            isHidden: true,
                        })
                        this.props.onAccessDenied();
                    } else {
                        this.setState({
                            data: data,
                            title: "Edit",
                        })
                    }
                }).catch((e) => {
                    console.log(e);
                    throw e;
                });
        }
    }

    generateInputs(data) {
        return Object.keys(data).map((key, index) => {
            if (key === 'side0' || key === "side1") {
                return (
                    <UserInput key={index} data={data} property={key} hidden={false} />
                )
            }

            return (
                <UserInput key={index} data={data} property={key} hidden={true} />
            )
        });
    }

    getUserInput(inputs) {
        let obj = {};
        inputs.forEach((input) => {
            obj[input.getAttribute('property')] = input.value;
        });

        return obj;
    }

    validateInputs(inputs) {
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].hidden && !inputs[i].value) {
                return false;
            }
        }

        return true;
    }

    handleSaveClick() {
        let inputs = document.querySelectorAll(".edit-inputs input");
        if (this.validateInputs(inputs)) {
            let obj = this.getUserInput(inputs);
            this.setState(
                {
                    isHidden: true,
                }
            )

            this.props.onSaveClick(obj);
        }
    }

    handleCancelClick() {
        this.setState(
            {
                isHidden: true,
            }
        )

        this.props.onCancelClick();
    }

    render() {
        if (this.state.isHidden) {
            return null;
        }

        return (
            <div className="edit-page">
                <div className="modal-content">
                    <h1>{this.state.title}</h1>
                    <div>
                        <div className="edit-inputs">
                            {this.generateInputs(this.state.data)}
                        </div>
                        <button className='cancel' onClick={this.handleCancelClick}>Cancel</button>
                        <button className='save' onClick={this.handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            addClass: false,
            value: this.props.data[this.props.property]
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        if (!value) {
            this.setState(
                {
                    value: value,
                    addClass: true,
                    status: 'Invalid Input',
                }
            )
        } else {
            this.setState(
                {
                    status: '',
                    addClass: false,
                    value: value
                }
            )
        }
    }

    render() {
        let className = "input";
        if (this.state.addClass) {
            className = className + " error";
        }

        return (
            <div>
                <input
                    value={this.state.value}
                    onChange={this.handleChange}
                    hidden={this.props.hidden}
                    className={className}
                    property={this.props.property} />
                <div>{this.state.status} </div>
            </div>
        );
    }
}
