
module powerbi.extensibility.visual {

    interface DataPoint {
        name: string;
        quantity: number;
        timing: string;
        route: string;
        color: string;
        destination: string;
        size: string;
    };

    interface ViewModel {
        dataPoints: DataPoint[];
    }

    export class Visual implements IVisual {
        private host: IVisualHost;
        private target: HTMLElement;
        private container: JQuery<Element>;
        private table: JQuery<Element>;
        private xPadding: number = 0.1;
        private yPadding: number = 0.1;

        constructor(options: VisualConstructorOptions) {
            this.host = options.host;
            this.target = options.element;
            this.container = $("<div/>").addClass('container');

            // Draw a 3 x 10 Table Matrix for product Labels 
            this.table = $("<table/>").addClass('table table-bordered');
            for (let i = 0; i < 10; i++) {
                let row = $("<tr/>");
                for (let j = 0; j < 3; j++) {
                    row.append($("<td/>"));
                }
                this.table.append(row);
            }

            this.container.append(this.table);
            $(this.target).append(this.container);
        }

        public update(options: VisualUpdateOptions) {
           // Render's updated visual when data changes or when Custom Visual is resized
           
            let viewModel = this.getViewModel(options);

            // console.log(viewModel);
            if (viewModel.dataPoints.length > 0) {
                this.container.empty();
               
                //console.log(this.container.html());
               
                
                this.table = $("<table/>").addClass('table table-bordered');
                
                //Appending viewModel onto table rows and column
                for (let i = 0; i < viewModel.dataPoints.length; i++) {
                    let row = $("<tr/>");
                    
                    for (let j = 0; j < 3; j++) {
                        
                        let td = $("<td/>");

                        let dataPoint = viewModel.dataPoints[i];
                        
                        if (dataPoint != undefined) {
                            // console.log(dataPoint);
                        
                            // Formatting Size data to include [], Converting Route Colour string to display respective colour, 
                            // slicing relevent time information from timestamp

                            let sizeTxt = '';
                            if (dataPoint.size != undefined && dataPoint.size.trim().toLowerCase() != 'o') {
                                sizeTxt = '        [' + dataPoint.size + ']';
                            }
                            let routeStyleTxt = '';
                            if (dataPoint.color != undefined) {
                                routeStyleTxt = 'color: white; background-color: ' + dataPoint.color.replace(" ", "");
                            }
                            let DateText = '';
                            if (dataPoint.timing != undefined) {
                                DateText = dataPoint.timing.slice(0, 10);
                            }


                            // Configuring orientation of Data inside cell boundry
                             
                            let html = `
                                    <div class="container">
                                        <div class="row">
                                            <div class="col">
                                                ${(dataPoint.name != undefined ? dataPoint.name : '')}
                                            </div>
                                            <div class="col-1">
                                                ${(dataPoint.quantity != undefined ? dataPoint.quantity : '')}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col" style="${routeStyleTxt}">
                                                ${(dataPoint.route != undefined ? dataPoint.route : '')}
                                            </div>
                                            <div class="col-6">
                                                ${(dataPoint.destination != undefined ? dataPoint.destination : '')}  
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col">
                                                ${DateText} 
                                            </div>
                                            <div class ="col-1">
                                                ${sizeTxt}
                                            <div>
                                        </div>
                                    </div>
                                `;
                            td.html(html);
                        }
                        row.append(td);
                        i++;
                    }
                    this.table.append(row);
                }
                this.container.append(this.table);
            }
        }

        private getViewModel(options: VisualUpdateOptions): ViewModel {
            let dv = options.dataViews;

            let viewModel: ViewModel = {
                dataPoints: [],
            };

            if (!dv
                || !dv[0].table
                || !dv[0].table.rows
                || !dv[0].table.rows[0]
                || !dv[0].table.columns)
                return viewModel;

            let view = dv[0].table;
            let rows = view.rows;
            let columns = view.columns;

            for (let i = 0; i < rows.length; i++) {
                let dataPoint = new Object;
                for (let j = 0; j < columns.length; j++) {
                    let roles = Object.keys(columns[j].roles);
                    dataPoint[roles[0]] = <string>rows[i][j];
                }
                viewModel.dataPoints.push(<DataPoint>dataPoint);
            }

            return viewModel;
        }
    }
}