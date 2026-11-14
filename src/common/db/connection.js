import mongoose from'mongoose';

import {config} from "../../confing/confing.js";

mongoose.connect(config.dbUrl);