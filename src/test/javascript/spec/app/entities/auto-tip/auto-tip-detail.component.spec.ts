/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { MehanicarTestModule } from '../../../test.module';
import { AutoTipDetailComponent } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip-detail.component';
import { AutoTipService } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.service';
import { AutoTip } from '../../../../../../main/webapp/app/entities/auto-tip/auto-tip.model';

describe('Component Tests', () => {

    describe('AutoTip Management Detail Component', () => {
        let comp: AutoTipDetailComponent;
        let fixture: ComponentFixture<AutoTipDetailComponent>;
        let service: AutoTipService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutoTipDetailComponent],
                providers: [
                    AutoTipService
                ]
            })
            .overrideTemplate(AutoTipDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutoTipDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutoTipService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new AutoTip(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.autoTip).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
