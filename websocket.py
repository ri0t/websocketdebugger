#!/usr/bin/env python

from circuits import Debugger
from circuits import handler
from circuits.web import Server, Controller, Static
from circuits.net.events import write
from circuits.web.websockets.dispatcher import WebSocketsDispatcher

from json import loads, dumps
from pprint import pprint

class Root(Controller):

    def __init__(self, *args, **kwargs):

        super(Root, self).__init__(args, kwargs)

        self.static = Static("/", docroot='./').register(self)
        self.websocket = WebSocketsDispatcher("/websocket").register(self)

    @handler("read", channel="wsserver")
    def readws(self, *args):
        obj = loads(args[1])

        print("Echoing:", obj)
        print("Echo encoded:", args[1].encode('utf8'))
        json = dumps(obj)

        self.fireEvent(write(args[0], json), "wsserver")

    @handler("read", channel="web")
    def readweb(self, *args):
        obj = args[1]

        print("Echoing:", obj)
        #print("Echo encoded:", args[1].encode('utf8'))
        #json = dumps(obj)

        #self.fireEvent(write(args[0], json), "wsserver")





app = Server(("0.0.0.0", 8000))
Debugger().register(app)
Root().register(app)
app.run()
