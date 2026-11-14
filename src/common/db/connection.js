import mongoose from'mongoose';

import {config} from "../../config/config.js";

mongoose.connect(config.dbUrl);