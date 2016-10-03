/*
 * #!/usr/bin/env python
 * # -*- coding: UTF-8 -*-
 *
 * __license__ = """
 * Hackerfleet Operating System
 * ============================
 * Copyright (C) 2011- $DateInfo.year riot <riot@hackerfleet.org> and others.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * """
 */

/**
 * Created by riot on 03.10.16.
 */

var socket = null;

function log(what) {
    var logbox = document.getElementById('log');
    logbox.innerHTML = '<span>' + what + '</span><br/>' + logbox.innerHTML;
}

function send(thing) {
    var payload = JSON.stringify(thing);
    log('Transmitting ' + payload.length + ' bytes');
    socket.send(payload);
}

function receive(thing) {
    log('Incoming data!');
    console.log(thing);
    var resultsbox = document.getElementById('results');
    resultsbox.innerHTML = '<span>' + thing.data + '</span><br />' + resultsbox.innerHTML;
}

function genTestData(iterations) {
    var data = 'A';
    
    for (var i=0; i < iterations; i++) {
        data += data;
    }
    
    return data;
}

function startTest() {
    log('Initiating test.');
    log('Opening connection.');
    
    socket = new WebSocket('ws://localhost:8000/websocket');
   
    function act() {
        log('Beginning transmitting payload.');
        var iters = document.getElementById('iterations').value;
        log(iters + ' iterations.');
        send({'data': genTestData(iters)});
    }
    
    log('Hooking onopen.');
    
    socket.onopen = act;
    socket.onmessage = receive;
    
    log('Done.');
}