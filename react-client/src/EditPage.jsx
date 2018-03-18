import React from 'react';

cardURL = "http://localhost:2666/cards/{0}";
export function saveCtmCard(obj, currentUserId) {
    let saveCtmCardURL = "http://localhost:2666/users/" + currentUserId + "/custom";
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
            isHidden: false,
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
        if (this.props.id !== null) {
            this.getCardById(this.props.id, this.props.currentUserId)
                .then((data) => {
                    if (!data["ownership"]) {
                        this.setState({
                            isHidden: true,
                        })
                        this.props.onDenied();
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
                    <UserInput data={data} key={key} hidden={false} />
                )
            }

            return (
                <UserInput data={data} key={key} hidden={true} />
            )
        });
    }

    getUserInput(inputs) {
        let obj = {};
        inputs.forEach((input) => {
            obj[input.getAttribute('key')] = input.value;
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
        if (validateInputs(inputs)) {
            let obj = getUserInput(inputs);
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
        if (this.state.hidden) {
            return null;
        }

        return (
            <div class="edit-page">
                <div class="modal-content">
                    <h1>{this.state.title}</h1>
                    <div>
                        <div class="edit-inputs">
                            {this.generateInputs(this.state.data)}
                        </div>
                        <button class='cancel' onClick={this.handleCancelClick}>Cancel</button>
                        <button class='save' onClick={this.handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

class UserInput extends React {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            addClass: false,
            value: ''
        }
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
                    value: ''
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
                    class={className}
                    key={this.props.key}
                    value={this.props.data[this.props.key]} />
                <div>{this.state.status} </div>
            </div>
        );
    }
}
