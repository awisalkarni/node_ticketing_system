import React from 'react';

import { Link } from 'react-router-dom';


export function Ticket(props) {
    return (
        <tr>
            <td>
                <Link to={"/ticket/detail/" + props.tickets._id} >{props.tickets.title}</Link>
            </td>
            <td>
                {props.tickets.description}
            </td>
            <td>
                {props.tickets.priority}
            </td>
            <td>
                {props.tickets.user.username}
            </td>
            <td>
                {(props.tickets.device) ? props.tickets.device.name : ""}
            </td>
            <td>
                {props.tickets.status}
            </td>
            <td>{props.tickets.createdAt}</td>
            <td>
                <div className="btn-group">
                    <Link className="btn btn-primary btn-sm" to={`/ticket/edit/${props.tickets._id}`}>Edit</Link>
                </div>

                <div className="btn-group btn-primary">
                    <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Status ({props.tickets.status})
                </button>
                    <div className="dropdown-menu">
                        <button className={`dropdown-item ${props.tickets.status === "open" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "open")}>Open</button>
                        <button className={`dropdown-item ${props.tickets.status === "on_hold" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "on_hold")}>On Hold</button>
                        <button className={`dropdown-item ${props.tickets.status === "in_progress" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "in_progress")}>In Progress</button>
                        <button className={`dropdown-item ${props.tickets.status === "in_review" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "in_review")}>In Review</button>
                        <button className={`dropdown-item ${props.tickets.status === "complete" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "complete")}>Complete</button>
                    </div>
                </div>

                <div className="btn-group dropright">
                    <button type="button" className="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Priority ({props.tickets.priority})
                </button>
                    <div className="dropdown-menu">
                        <button className={`dropdown-item ${props.tickets.priority === "high" ? "active" : ""}`} onClick={() => props.changePriority(props.tickets, "high")}>High</button>
                        <button className={`dropdown-item ${props.tickets.priority === "medium" ? "active" : ""}`} onClick={() => props.changePriority(props.tickets, "medium")}>Medium</button>
                        <button className={`dropdown-item ${props.tickets.priority === "low" ? "active" : ""}`} onClick={() => props.changePriority(props.tickets, "low")}>Low</button>
                    </div>
                </div>

            </td>
        </tr>
    );
}